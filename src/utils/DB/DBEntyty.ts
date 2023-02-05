export abstract class DBEntity<
  Entity extends { id: string },
  ChangeDTO,
  CreateDTO,
> {
  protected entities: Entity[] = [];
  abstract create(createDTO: CreateDTO): Entity;
  findAll() {
    return this.entities;
  }

  findOne(id: string) {
    const findedEntity = this.entities.find((entity) => entity.id === id);
    return findedEntity === undefined ? null : findedEntity;
  }

  delete(id: string) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) return null;
    const deletedEntity = this.entities.splice(idx, 1);
    return deletedEntity;
  }

  change(id: string, chandeDTO: ChangeDTO) {
    const idx = this.entities.findIndex((entity) => entity.id === id);
    if (idx < 0) return null;
    const changedEntity = { ...this.entities[idx], ...chandeDTO };
    this.entities[idx] = changedEntity;
    return changedEntity;
  }
}
