import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const convertObjectId = function (id: any | any[]) {
  try {
    if (Array.isArray(id)) {
      return id.map((el) => new Types.ObjectId(el));
    } else {
      return new Types.ObjectId(id);
    }
  } catch (error) {
    throw new BadRequestException(`Invalid Object ID`);
  }
};
