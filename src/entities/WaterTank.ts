export class WaterTank {
  public waterLevel: number = 0;

  public increaseWaterLevel(augmentation: number): void {
    this.waterLevel += augmentation;
  }

  public deacreaseWaterLevel(augmentation: number): void {
    this.waterLevel -= augmentation;
  }
}
