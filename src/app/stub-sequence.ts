export default [
  {
    type: 'pose',
    name: 'baddha konasana',
    sides: 'bilateral',
    unilateralOnly: false,
    parent: {
      type: 'root'
    }
  },
  {
    type: 'pose',
    name: 'seated twist',
    sides: 'unilateral',
    unilateralOnly: false,
    parent: {
      type: 'root'
    }
  },
  {
    type: 'series',
    name: 'Vignette 1' ,
    parent: {
      type: 'root'
    }
  },
  {
    type: 'pose',
    name: 'warrior 2',
    sides: 'unilateral',
    unilateralOnly: true,
    parent: {
      type: 'series',
      id: 0
    }
  },
  {
    type: 'pose',
    name: 'reverse warrior',
    sides: 'unilateral',
    unilateralOnly: true,
    parent: {
      type: 'series',
      id: 0
    }
  },
  {
    type: 'series',
    name: 'Vignette 2' ,
    parent: {
      type: 'root'
    }
  },
  {
    type: 'pose',
    name: 'warrior 1',
    sides: 'unilateral',
    unilateralOnly: true,
    parent: {
      type: 'series',
      id: 1
    }
  },
  {
    type: 'pose',
    name: 'archer',
    sides: 'unilateral',
    unilateralOnly: true,
    parent: {
      type: 'series',
      id: 1
    }
  },
  {
    type: 'pose',
    name: 'savasana',
    unilateralOnly: false,
    sides: 'bilateral',
    duration: 5,
    timing: 'minutes',
    parent: {
      type: 'root'
    }
  },
]