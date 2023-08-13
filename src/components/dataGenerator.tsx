import { faker } from '@faker-js/faker';
import { MainData } from '../interfaces/MainData';

class DataGenerator {
    constructor (private region: string, private errorSliderValue: number, private errorFieldValue: number, seed: number) {
      faker.seed(seed);
    }
    generateData() {
      const newData: MainData[] = [];
      for (let i = 0; i < 10; i++) {
        const person = this.generatePerson()
        newData.push(person)
      }
  
      return newData;
    }

    private generatePerson() {
      return {
        randomIdentifier: faker.datatype.uuid(),
        name: faker.person.firstName() + faker.person.lastName(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number()
      }
    }
}
  
export default DataGenerator;
  