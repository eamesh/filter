export class GlobalLoading {
  private _queuesNum: number = 0;

  public get queuesNum () {
    return this._queuesNum;
  }

  increment () {
    this._queuesNum += 1;

    return this._queuesNum;
  }

  decrement () {
    this.queuesNum !== 0 && (
      this._queuesNum -= 1
    );

    return this._queuesNum;
  }
}

export default new GlobalLoading();
