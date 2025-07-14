export class WaterTank {
  public waterLevel: number = 0;

  public constructor(waterLevel: number) {
    this.waterLevel = waterLevel;
  }

  public increaseWaterLevel(augmentation: number): void {
    this.waterLevel += augmentation;
  }

  public deacreaseWaterLevel(diminution: number): void {
    this.waterLevel -= diminution;
  }
}
