import MoveControl from './move';

type Point = {
    x: number,
    y: number
}

enum DistanceStatus { 'EMPTY', 'HALF', 'DONE' }

type Status = 'update' | 'reset' | 'none';

class ScrollControl extends MoveControl {
    
    Refresh_Distance: number;
    distanceStatus?: DistanceStatus;
    isRefreshable: boolean;
    beginTime?: number;

    constructor() {
        super({direction: 'y'});
        this.Refresh_Distance = 90;
        this.isRefreshable = true;
    }

    _getFinalEndPonit(): Point {
        return {
            x: 0,
            y: 0
        };
    }

    markBeginTime() {
        this.beginTime = Date.now();
    }

    _getTimeTotal(): number {
        const endTime = Date.now();
        const moveTime = endTime - this.beginTime!;
        return moveTime;
    }

    getExpectMat(): number {
        const distanceTotal = this.getMoveDist();
        const moveTime = this._getTimeTotal();
        // 速度 = 路程 / 时间
        const speed = distanceTotal / moveTime;
        // 计算期望缓冲距离
        return speed * 234;
    }

    banRefresh() {
        this.isRefreshable = false;
    }

    canRefresh() {
        this.isRefreshable = true;
    }

    resetRefreshStatus() {
        this.distanceStatus = DistanceStatus.EMPTY;
    }

    markScrollTip(): string {
        let tip = '';
        const dist = this.getMoveDist();
        if (dist > this.Refresh_Distance) {
            this.distanceStatus = DistanceStatus.DONE;
            tip = '松开刷新';
        } else if (dist > 0){
            this.distanceStatus = DistanceStatus.HALF;
            tip = '下拉刷新';
        }
        return tip;
    }

    getUpdateStatus(): Status {
        if (this.distanceStatus === DistanceStatus.DONE) {
            return 'update';
        }
        if (this.distanceStatus === DistanceStatus.HALF) {
            return 'reset';
        }
        return 'none';
    }

}

export default ScrollControl;