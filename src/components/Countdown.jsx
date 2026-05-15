import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Countdown({ date }) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const target = dayjs(date);

      const diff = target.diff(now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex justify-center gap-6 flex-wrap">

      <div className="bg-white shadow-md p-6 w-24">
        <p className="text-3xl font-semibold">{time.days}</p>
        <p className="text-sm text-gray-500">Días</p>
      </div>

      <div className="bg-white shadow-md p-6 w-24">
        <p className="text-3xl font-semibold">{time.hours}</p>
        <p className="text-sm text-gray-500">Horas</p>
      </div>

      <div className="bg-white shadow-md p-6 w-24">
        <p className="text-3xl font-semibold">{time.minutes}</p>
        <p className="text-sm text-gray-500">Min</p>
      </div>

      <div className="bg-white shadow-md p-6 w-24">
        <p className="text-3xl font-semibold">{time.seconds}</p>
        <p className="text-sm text-gray-500 ">Seg</p>
      </div>

    </div>
  );
}
