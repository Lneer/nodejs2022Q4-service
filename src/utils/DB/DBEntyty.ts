export abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  protected entities: Entity[] = [];
  abstract create(createDTO: CreateDTO): Entity;
  abstract change(id: string, chandeDTO: ChangeDTO): Entity;
  findAll() {
    return this.entities;
  }

  // findOne(id: string) {
  //   const findedEntity = this.entities.find((entity) => entity.id === id);
  //   return findedEntity;
  // }

  findOne({ key, equal }: { key: keyof Entity; equal: Entity[keyof Entity] }) {
    const findedEntity = this.entities.find((entity) => entity[key] === equal);
    return findedEntity;
  }

  delete(id: string) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) return null;
    const deletedEntity = this.entities[idx];
    this.entities.splice(idx, 1);
    return deletedEntity;
  }

  // change(id: string, chandeDTO: ChangeDTO) {
  //   const idx = this.entities.findIndex((entity) => entity.id === id);
  //   if (idx < 0) return null;
  //   const changedEntity = { ...this.entities[idx], ...chandeDTO };
  //   this.entities[idx] = changedEntity;
  //   return changedEntity;
  // }
}
