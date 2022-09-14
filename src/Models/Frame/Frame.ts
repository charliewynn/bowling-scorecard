export default class Frame {
  private _ball1Score: number;
  private _ball2Score: number;
  private _scoreType: "none" | "spare" | "strike";

  get ball1Score(): number {
    return this._ball1Score;
  }
  get ball2Score(): number {
    return this._ball2Score;
  }
  get totalPins(): number {
    return this._ball1Score + this.ball2Score;
  }
  get scoreType(): "none" | "spare" | "strike" {
    return this._scoreType;
  }
  constructor(frame?: Frame) {
    if (frame) {
      this._ball1Score = frame.ball1Score;
      this._ball2Score = frame.ball2Score;
      this._scoreType = frame.scoreType;
    } else {
      this._ball1Score = 0;
      this._ball2Score = 0;
      this._scoreType = "none";
    }
  }

  /**
   * Record a players score for a non-strike and non-spare frame
   * @param ball1 Number of pins knocked down by the first ball
   * @param ball2 Number of pins knocked down by the second ball
   * @returns Returns the frame object
   */
  RecordScore(ball1: number, ball2: number): Frame {
    const sum = ball1 + ball2;
    if (sum < 0 || sum > 9) {
      throw new Error(
        "A frame should score 0-9 unless it is a spare or strike"
      );
    }
    this._ball1Score = ball1;
    this._ball2Score = ball2;
    this._scoreType = "none";
    return this;
  }

  /**
   * Record a spare for the frame.
   * @returns Returns the frame object
   */
  RecordSpare(ball1: number, ball2: number): Frame {
    if (ball1 + ball2 !== 10) {
      throw new Error("A spare should have both balls equaling 10 pins");
    }
    this._ball1Score = ball1;
    this._ball2Score = ball2;
    this._scoreType = "spare";
    return this;
  }

  /**
   * Record a strike for the frame.
   * @returns Returns the frame object
   */
  RecordStrike(): Frame {
    this._ball1Score = 10;
    this._scoreType = "strike";
    return this;
  }
}
