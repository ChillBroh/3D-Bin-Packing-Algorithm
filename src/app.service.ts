/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

interface Bin {
  width: number;
  length: number;
  height: number;
  weight: number;
  boxes: {
    index: number;
    position: { x: number; y: number; z: number };
  }[];
}

interface MaxBin {
  width: number;
  length: number;
  height: number;
  weight: number;
}

interface SmallBox {
  width: number;
  length: number;
  height: number;
  weight: number;
}

interface Request {
  maxBin: MaxBin;
  box: SmallBox;
  numBoxes: number;
}

interface FitResult {
  success: boolean;
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  length?: number;
  height?: number;
}

@Injectable()
export class AppService {
  //y = length
  //z= height
  //x = width
  binPacking3D(request: Request): Bin[] | string {
    const MAX_LARGE_BOX_VOLUME_CUBIC_CM = 250000; // Assuming unit is cubic centimeter

    const { maxBin, box, numBoxes } = request;
    const smallBoxWeight = box.weight;

    const smallBoxVolume = box.length * box.height * box.width;

    if (maxBin.width < box.width) {
      return 'Width must be below 105cm';
    }

    if (maxBin.length < box.length) {
      return 'length must be below 105cm';
    }

    if (maxBin.height < box.height) {
      return 'Height must be below 105cm';
    }
    if (maxBin.weight < box.weight) {
      return 'Weight must be below 22kg';
    }
    if (smallBoxVolume > MAX_LARGE_BOX_VOLUME_CUBIC_CM) {
      return 'total volume must be below 0.25 cubic meteres';
    }
    const bins: Bin[] = [];
    let finalBinDimensions: FitResult = { success: false };

    function packBoxes(index: number): Bin[] {
      if (index === numBoxes) {
        return bins.slice();
      }

      for (let i = 0; i < bins.length; i++) {
        const currentBin = bins[i];

        const fit1 = fitBox(currentBin, index);
        const fit2 = fitBox(currentBin, index, true);

        if (fit1.success || fit2.success) {
          const chosenFit = fit1.success ? fit1 : fit2;

          currentBin.boxes.push({
            index,
            position: { x: chosenFit.x!, y: chosenFit.y!, z: chosenFit.z! },
          });
          currentBin.weight += box.weight;
          const result = packBoxes(index + 1);
          if (result !== null) {
            return result;
          }
          currentBin.boxes.pop();
          currentBin.weight -= box.weight;
        }
      }

      const newBin = {
        width: maxBin.width,
        length: maxBin.length,
        height: maxBin.height,
        weight: box.weight - smallBoxWeight,
        boxes: [],
      };
      bins.push(newBin);

      const result = packBoxes(index);

      if (result !== null) {
        return result;
      }
      bins.pop();

      return null;
    }

    function fitBox(bin: Bin, boxIndex: number, rotate = false): FitResult {
      const boxDimensions = [box.width, box.length, box.height];
      const boxVolume = boxDimensions.reduce((acc, dim) => acc * dim, 1);
      const boxWeight = box.weight;
      const rotation = rotate
        ? [boxDimensions[1], boxDimensions[0], boxDimensions[2]]
        : boxDimensions;

      for (let x = 0; x <= bin.width - rotation[0]; x++) {
        for (let y = 0; y <= bin.length - rotation[1]; y++) {
          for (let z = 0; z <= bin.height - rotation[2]; z++) {
            let fit = true;
            let totalWeight = boxWeight;
            let totalVolume = boxVolume;

            for (const placedBox of bin.boxes) {
              const placedDimensions = [box.width, box.length, box.height];
              const placedVolume =
                request.box.width * request.box.length * request.box.height; // Calculate placed box volume
              const placedWeight = request.box.weight;

              if (
                x < placedBox.position.x + placedDimensions[0] &&
                y < placedBox.position.y + placedDimensions[1] &&
                z < placedBox.position.z + placedDimensions[2] &&
                x + rotation[0] > placedBox.position.x &&
                y + rotation[1] > placedBox.position.y &&
                z + rotation[2] > placedBox.position.z
              ) {
                fit = false;
                break;
              }

              totalWeight += placedWeight;
              totalVolume += placedVolume;
            }

            // Check if the box fits, the total weight is within the limit, and the total volume is within the limit
            if (
              fit &&
              totalWeight <= request.maxBin.weight &&
              totalVolume <= MAX_LARGE_BOX_VOLUME_CUBIC_CM
            ) {
              finalBinDimensions = {
                success: true,
                x,
                y,
                z,
                width: rotation[0],
                length: rotation[1],
                height: rotation[2],
              };
              return finalBinDimensions;
            }
          }
        }
      }
      return { success: false };
    }

    const result = packBoxes(0);

    if (finalBinDimensions.success) {
      console.log('Large box dimensions after packing:', finalBinDimensions);
    } else {
      console.log('Packing failed. No valid arrangement found.');
    }

    return result;
  }
}
