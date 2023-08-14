import { Faker } from '@faker-js/faker';
import { allFakers } from '@faker-js/faker';
import { MainData } from '../interfaces/MainData';
import { RegionType } from '../interfaces/RegionType';

class DataGenerator {
    private customizedFaker: Faker;
    constructor (private region: RegionType, private errorFieldValue: number, seed: number) {
        this.customizedFaker = allFakers[region]
        this.customizedFaker.seed(seed)
    }
    generateData(ammount: number) {
      const newData: MainData[] = [];
      for (let i = 0; i < ammount; i++) {
        const person = this.generatePerson()
        newData.push(person)
      }
      return newData;
    }

    private generatePerson() {
      const faker = this.customizedFaker
      return {
        randomIdentifier: faker.string.uuid(), //.slice(0, 13)
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        address: this.region === RegionType.de ?
         `${faker.location.state()} ${faker.location.city()} ${faker.location.street()} ${faker.location.secondaryAddress()}` :
         this.region === RegionType.en ?
         `${faker.location.city()} ${faker.location.street()} ${faker.location.buildingNumber()}` :
         `${faker.location.zipCode()} ${faker.location.city()} ${faker.location.streetAddress()}`,
        phone: faker.phone.number()
      }
    }

    // private cryptoPerson(person: MainData) {
      
    // }
}
  
export default DataGenerator;
  