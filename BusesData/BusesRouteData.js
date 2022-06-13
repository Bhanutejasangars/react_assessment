export const getBusData = (journeyDetail, availableBuses) => {
  let arr = [];
  const { from, to, date } = journeyDetail;
  for (const bus of availableBuses) {
    const buses = busDetails[bus?.id];
    const { name, type, seats } = bus;
    const [type1, type2] = type;

    const bordingPoint = buses.filter((bus) => {
      return bus?.cityName === from;
    });

    const departurePoint = buses.filter((bus) => {
      return bus?.cityName === to;
    });
    let startingTime = bordingPoint[0]?.time;
    let reachingTime = departurePoint[0]?.time;

    const time = Math.abs(
      Number(bordingPoint[0]?.time) - Number(departurePoint[0]?.time)
    );

    const distance = Math.abs(
      Number(bordingPoint[0]?.distance) - Number(departurePoint[0]?.distance)
    );

    const price = distance * 2;
    if (Number(startingTime) > Number(reachingTime)) {
      [startingTime, reachingTime] = [reachingTime, startingTime];
    }

    arr.push({
      id: Math.random().toFixed(4) * 10000,
      from,
      to,
      date,
      name,
      type: type1 + "  " + type2,
      time,
      seats,
      distance,
      price,
      startingTime,
      reachingTime,
    });
  }
  return arr;
};

export const busDetails = {
  bus1: [
    { id: "101", time: "13", cityName: "Chennai", distance: 0 },
    { id: "102", time: "14", cityName: "Banglore", distance: 400 },
    { id: "103", time: "15", cityName: "Hyderabad", distance: 700 },
    { id: "104", time: "16", cityName: "Karimnagar", distance: 900 },
    { id: "105", time: "17", cityName: "Mancherial", distance: 1100 },
  ],

  bus2: [
    { id: "101", time: "13", cityName: "Chennai", distance: 0 },
    { id: "102", time: "14", cityName: "Banglore", distance: 400 },
    { id: "103", time: "15", cityName: "Hyderabad", distance: 700 },
    { id: "104", time: "16", cityName: "Karimnagar", distance: 900 },
    { id: "105", time: "17", cityName: "Mancherial", distance: 1100 },
  ],

  bus3: [
    { id: "101", time: "13", cityName: "Chennai", distance: 0 },
    { id: "102", time: "14", cityName: "Banglore", distance: 400 },
    { id: "103", time: "15", cityName: "Hyderabad", distance: 700 },
    { id: "104", time: "16", cityName: "Karimnagar", distance: 900 },
    { id: "105", time: "17", cityName: "Mancherial", distance: 1100 },
  ],

  bus4: [
    { id: "101", time: "13", cityName: "Chennai", distance: 0 },
    { id: "102", time: "14", cityName: "Banglore", distance: 400 },
    { id: "103", time: "15", cityName: "Hyderabad", distance: 700 },
    { id: "104", time: "16", cityName: "Karimnagar", distance: 900 },
    { id: "105", time: "17", cityName: "Mancherial", distance: 1100 },
  ],
  bus5: [
    { id: "101", time: "13", cityName: "Chennai", distance: 0 },
    { id: "102", time: "14", cityName: "Banglore", distance: 400 },
    { id: "103", time: "15", cityName: "Hyderabad", distance: 700 },
    { id: "104", time: "16", cityName: "Karimnagar", distance: 900 },
    { id: "105", time: "17", cityName: "Mancherial", distance: 1100 },
  ],
};

export const availableBuses = [
  {
    id: "bus1",
    name: "Orange Travels",
    type: ["A/c", "sleeper"],
    seats: 34,
  },
  {
    id: "bus2",
    name: "Diwakar Travels",
    type: ["Non A/c", "seating(2+1)"],
    seats: 21,
  },
  {
    id: "bus3",
    name: "Amaravathi Travels",
    type: ["A/c", "sleeper"],
    seats: 14,
  },
  {
    id: "bus4",
    name: "Ksrtc",
    type: ["A/c", "seating(2+1)"],
    seats: 11,
  },
  {
    id: "bus5",
    name: "Selva Tours",
    type: ["Non A/c", "sleeper"],
    seats: 31,
  },
];
