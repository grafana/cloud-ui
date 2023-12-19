import PQueue from 'p-queue';
import { useEffect, useRef, useState } from 'react';

export interface QueueProps<ResultType> {
  tasks: Array<() => Promise<ResultType>>;
  concurrency?: number;
  autoStart?: boolean;
  interval?: number;
}

export interface Queue<ResultType> {
  isRunning: boolean;
  isCompleted: boolean;
  progress: number;
  progressCompleted: number;
  total: number;
  isStarted: boolean;
  pending: number;
  remaining: number;
  isPaused: boolean;
  completedTasks: ResultType[];
  failedTasks: ResultType[];
  start: () => void;
  pause: () => void;
  clear: () => void;
}

export function usePromiseQueue<ResultType>({
  concurrency = 10,
  autoStart = false,
  interval = 0,
  tasks,
}: QueueProps<ResultType>): Queue<ResultType> {
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressCompleted, setProgressCompleted] = useState(0);
  const total = useRef(tasks.length);
  const active = useRef(0);
  const isStarted = active.current > 0;
  const completedTasks = useRef<ResultType[]>([]);
  const failedTasks = useRef<ResultType[]>([]);

  const queue = useRef<PQueue>(
    new PQueue({ concurrency, autoStart, interval })
      .on('active', () => {
        active.current++;
        setProgress(active.current / total.current);
      })
      .on('idle', () => {
        setIsCompleted(true);
      })
      .on('completed', (result) => {
        if (result.error) {
          failedTasks.current.push(result);
        } else {
          completedTasks.current.push(result);
          setProgressCompleted(completedTasks.current.length / total.current);
        }
      })
      .on('error', (error) => {
        failedTasks.current.push(error);
      })
  );

  // clean up queue on unmount
  useEffect(() => {
    const queueInstance = queue.current;
    return () => {
      if (queueInstance) {
        queueInstance.clear();
      }
    };
  }, []);

  useEffect(() => {
    queue.current.clear();
    total.current = tasks.length;
    active.current = 0;
    completedTasks.current = [];
    failedTasks.current = [];
    setIsCompleted(false);
    setProgress(0);
    setProgressCompleted(0);
    queue.current.addAll(tasks);
  }, [tasks]);

  return {
    isRunning,
    isCompleted,
    progress,
    progressCompleted,
    total: total.current,
    remaining: total.current - active.current,
    pending: queue.current.pending,
    isStarted,
    isPaused: queue.current.isPaused,
    completedTasks: completedTasks.current,
    failedTasks: failedTasks.current,
    start: () => {
      queue.current.start();
      setIsRunning(true);
    },
    pause: () => {
      queue.current.pause();
      setIsRunning(false);
    },
    clear: () => {
      queue.current.clear();
      setIsRunning(false);
    },
  };
}
