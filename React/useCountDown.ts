import { listenerCount } from "process";

export type FormatTime = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number
}

export interface Options {
  leftTime?: number,
  targetTime?: number,
  interval:number,
  onEnd:()=> void,
  
}

function calcLeftTime (time) {
  if (!time) return 0;
  const left = new Date(time).valueOf() - Date.now();
  
  return left < 0 ? 0 : left;
  
}

function parseMs () {
  
}

export function useCountDown (options: Options) {
  const { leftTime, targetTime, onEnd,interval = 1000 } = options;

  const target = useMemo(() => {
    if ('leftTime' in options) {
      return Number(leftTime) + Date.now()
    } else {
      return targetTime
    }
    
  }, [leftTime, targetTime]);

  const [timeLeft, setTimeLeft] = useState(() => calcLeftTime(target))
  const onEndRef = useRef(onEnd)

  useEffect(() => {

    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(() => calcLeftTime(target));

    let timerId = setInterval(() => {
      const targetLeft = calcLeftTime(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timerId);
        onEndRef.current?.();
      }
    }, interval)
    

    return () =>clearInterval(timerId)
   }
    
  },[leftTime])


  const formateRes = parseMs(leftTime)
  
  return [leftTime,formatRes]
}