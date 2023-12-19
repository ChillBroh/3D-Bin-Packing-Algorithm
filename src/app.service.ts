/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

interface Bin {
  width: number;
  length: number;
  height: number;
  remainingWidth: number;
  remainingLength: number;
  remainingHeight: number;

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
  // Constants
  readonly MAX_LARGE_BOX_VOLUME = 0.25;

  binPacking3D(request: Request): Bin[] {
    console.log(request);
    const { maxBin, box, numBoxes } = request;

    const bins: Bin[] = [];
    let finalBinDimensions: FitResult = { success: false };

    // Main recursive packing function
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
          console.log(chosenFit);
          const remainingBox = {
            width: currentBin.width - chosenFit.width!,
            length: currentBin.length - chosenFit.length!,
            height: currentBin.height - chosenFit.height!,
          };

          currentBin.boxes.push({
            index,
            position: { x: chosenFit.x!, y: chosenFit.y!, z: chosenFit.z! },
          });

          currentBin.remainingWidth = remainingBox.width;
          currentBin.remainingLength = remainingBox.length;
          currentBin.remainingHeight = remainingBox.height;

          const result = packBoxes(index + 1);

          if (result !== null) {
            return result;
          }
          currentBin.boxes.pop();
        }
      }

      // If no existing bin can accommodate the box, create a new bin
      const newBin = {
        width: maxBin.width,
        length: maxBin.length,
        height: maxBin.height,
        remainingWidth: maxBin.width,
        remainingLength: maxBin.length,
        remainingHeight: maxBin.height,
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

    // Check if the box fits into the given bin at a specific position
    function fitBox(bin: Bin, boxIndex: number, rotate = false): FitResult {
      const boxDimensions = [box.width, box.length, box.height];
      const boxWeight = box.weight;
      const rotation = rotate
        ? [boxDimensions[1], boxDimensions[0], boxDimensions[2]]
        : boxDimensions;

      for (let x = 0; x <= bin.remainingWidth - rotation[0]; x++) {
        for (let y = 0; y <= bin.remainingLength - rotation[1]; y++) {
          for (let z = 0; z <= bin.remainingHeight - rotation[2]; z++) {
            let fit = true;
            let totalWeight = boxWeight;

            for (const placedBox of bin.boxes) {
              const placedDimensions = [
                placedBox.position.x + box.width,
                placedBox.position.y + box.length,
                placedBox.position.z + box.height,
              ];
              const placedWeight = request.box.weight;
              if (
                x < placedDimensions[0] &&
                y < placedDimensions[1] &&
                z < placedDimensions[2] &&
                x + rotation[0] > placedBox.position.x &&
                y + rotation[1] > placedBox.position.y &&
                z + rotation[2] > placedBox.position.z
              ) {
                fit = false;
                break;
              }
              totalWeight += placedWeight;
            }
            // Check if the box fits and the total weight is within the limit
            if (fit && totalWeight <= request.maxBin.weight) {
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

    // Start packing the boxes
    const result = packBoxes(0);

    // Display the result or failure message
    if (finalBinDimensions.success) {
      console.log('Large box dimensions after packing:', finalBinDimensions);
    } else {
      console.log('Packing failed. No valid arrangement found.');
    }

    return result;
  }
}
