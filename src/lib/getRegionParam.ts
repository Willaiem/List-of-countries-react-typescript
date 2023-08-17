const options = {
  all: 'All regions',
  europe: 'Europe',
  americas: 'Americas',
  asia: 'Asia',
  antarctic: 'Antarctic',
  oceania: 'Oceania',
  africa: 'Africa',
}


export const getRegionParams = (searchParam: URLSearchParams) => (searchParam.get('region') as keyof typeof options ?? 'all')
