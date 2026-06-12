import { ConflictException } from '@nestjs/common';
import { RentalWithOwner } from 'src/rentals/rentals.repository';

export default function adaptRentalObject(rental: RentalWithOwner) {
  if (!rental) {
    throw new ConflictException('Rental does not exist');
  }
  const { USERS: owner, ...rest } = rental;
  return { ...rest, owner };
}
