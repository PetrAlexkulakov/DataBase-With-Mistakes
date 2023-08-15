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
    return this.cryptoPerson({
      randomIdentifier: faker.string.uuid(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      address: this.region === RegionType.de ?
        `${faker.location.state()} ${faker.location.city()} ${faker.location.street()}` :
        this.region === RegionType.en ?
        `${faker.location.city()} ${faker.location.street()} ${faker.location.buildingNumber()}` :
        `${faker.location.zipCode()} ${faker.location.city()} ${faker.location.streetAddress()}`,
      phone: faker.phone.number()
    })
  }

  private cryptoPerson(person: MainData) {
    const mistakes = Math.floor(this.errorFieldValue);
    const mistakeChanse = this.errorFieldValue % 100;
    for (let i = 0; i < mistakes; i++) {
      this.makeMistake(person)
    }
    if(Math.random() <= mistakeChanse) {
      this.makeMistake(person)
    }
    return person
  }

  private makeMistake(person: MainData) {
    const fieldName = this.getField(person)
    const random = Math.random()
    if (random <= 0.33) {
      person[fieldName as keyof MainData] = this.doDelete(person[fieldName as keyof MainData])
    } else if (random <= 0.66) {
      person[fieldName as keyof MainData] = this.doAdd(person[fieldName as keyof MainData], fieldName)
    } else {
      person[fieldName as keyof MainData] = this.doSwitch(person[fieldName as keyof MainData])
    }
  }

  private getField(person: MainData) {
    const keys = Object.keys(person);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  private getRandomCharFromString(str: string) {
    return str[Math.floor(Math.random() * str.length)];
  }

  private getChar(fieldName: string) {
    if (fieldName === 'name') { 
      return this.customizedFaker.string.alpha() 
    }
    if (fieldName === 'phone') {
      return this.getRandomCharFromString(this.customizedFaker.string.symbol() + this.customizedFaker.number.int({min: 0, max: 9}))
    }
    if (fieldName === 'randomIdentifier' || fieldName === 'address') {
      return this.getRandomCharFromString(this.customizedFaker.string.alpha() + this.customizedFaker.number.int({min: 0, max: 9}));
    }
  }

  private doDelete(field: string): string {
    if (field.length === 0) {
      return field;
    }

    const randomIndex = Math.floor(Math.random() * field.length);
    return field.slice(0, randomIndex) + field.slice(randomIndex + 1);
  }

  private doAdd(field: string, fieldName: string): string {
    const randomIndex = Math.floor(Math.random() * field.length)
    return field.slice(0, randomIndex) + this.getChar(fieldName) + field.slice(randomIndex);
  }

  private doSwitch(field: string): string {
    const chars = field.split("");
    
    for (let i = 0; i < chars.length - 1; i += 2) {
      [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
    }

    return chars.join("");
  }
}
  
export default DataGenerator;
  