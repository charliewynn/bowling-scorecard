import Frame from "../Frame/Frame";

export default class Game {
  frames: Array<Frame>;

  // If the final frame is a spare or strike, an extra ball is allowed
  private _extraBall1: number;

  //if the final frame is a strike, the play gets an additional extra ball
  private _extraBall2: number;

  private _score: number;

  get score() {
    return this._score;
  }

  constructor() {
    this.frames = new Array<Frame>();
    this._extraBall1 = 0;
    this._extraBall2 = 0;
    this._score = 0;

    for (let i = 0; i < 10; i++) {
      this.frames[i] = new Frame();
    }
  }

  /**
   * Store a frame with an associated frameIndex
   * @param frame Frame object to be entered into the Game
   * @param frameIndex 0-based index of the frame to be inserted
   * @returns updated game score
   */
  recordFrame(frame: Frame, frameIndex: number): number {
    if (frameIndex < 0 || frameIndex > 9) {
      throw new Error("Cannot enter a frame outside of frames 1-10");
    }
    this.frames[frameIndex] = new Frame(frame);
    this.calculateScore();
    return this.score;
  }

  /**
   * This does not care if the provided frame is a spare/strike/neither. It will always return the next two ball scores
   * @param frameIndex Frame index for which to get the next two ball scores
   * @returns Array with [nextBallScore, secondNextBallScore]
   */
  nextBallPinsFromFrame(
    frameIndex: number
  ): [nextBallScore: number, secondNextBallScore: number] {
    if (frameIndex < 0 || frameIndex > 9) {
      throw new Error(
        "Cannot calculate from invalid frame number. Enter a number 0-9"
      );
    }

    // final frame gets the two extra balls
    if (frameIndex == 9) {
      return [this._extraBall1, this._extraBall2];
    }

    // second to final frame gets either final frame [1st ball, extra ball 1] (if a strike)
    //  or it will get [1st ball, 2nd ball], from final frame
    if (frameIndex == 8) {
      const lastFrame = this.frames[9];
      if (lastFrame.scoreType == "strike") {
        return [lastFrame.ball1Score, this._extraBall1];
      }
      return [lastFrame.ball1Score, lastFrame.ball2Score];
    }
    // any other frame gets either next frame [1st ball, secondNext frame 1st ball] (if a strike)
    //  or it will get [1st ball, 2nd ball], from next frame
    else {
      const nextFrame = this.frames[frameIndex + 1];
      const secondNextFrame = this.frames[frameIndex + 2];

      if (nextFrame.scoreType == "strike") {
        return [nextFrame.ball1Score, secondNextFrame.ball1Score];
      }
      return [nextFrame.ball1Score, nextFrame.ball2Score];
    }
  }

  /**
   *
   * @param nextBallScore
   * @param secondNextBallScore
   * @returns
   */
  recordExtraBallScores(
    nextBallScore: number,
    secondNextBallScore?: number
  ): number {
    const lastFrame = this.frames[9];
    if (lastFrame.scoreType == "none") {
      throw new Error(
        "Cannot score extra balls when the last frame is not a spare/strike"
      );
    }
    this._extraBall1 = nextBallScore;
    if (secondNextBallScore !== undefined) {
      if (lastFrame.scoreType == "spare") {
        throw new Error(
          "Cannot score two balls when the last frame is not a strike"
        );
      }
      this._extraBall2 = secondNextBallScore ?? 0;
    }
    this.calculateScore();
    return this.score;
  }
  private calculateScore(): void {
    let newScore = 0;
    this.frames.forEach((frame, index) => {
      newScore += frame.totalPins;
      if (frame.scoreType != "none") {
        const nextBalls = this.nextBallPinsFromFrame(index);
        newScore += nextBalls[0];
        if (frame.scoreType == "strike") {
          newScore += nextBalls[1];
        }
      }
    });
    this._score = newScore;
  }
}
