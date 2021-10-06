import P5 from 'p5';

export type Asset = P5.Image;

export default class AssetManager {
  private p: P5;

  private assetStore: Map<string, Asset>;

  constructor(p: P5) {
    this.p = p;
    this.assetStore = new Map();
  }

  public getAsset(assetName: string): Asset | undefined {
    return this.assetStore.get(assetName);
  }

  public fetchAsset(assetName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.assetStore.has(assetName)) resolve();

      this.p.loadImage(`assets/${assetName}`, (image: P5.Image) => {
        this.assetStore.set(assetName, image);
        resolve();
      }, reject);
    });
  }
}
