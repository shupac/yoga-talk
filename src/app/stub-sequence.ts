export default [
  {
    type: 'pose',
    name: 'baddha konasana',
    sides: 'bilateral',
    parent: {
      type: 'sequence'
    }
  },
  {
    type: 'pose',
    name: 'seated twist',
    sides: 'unilateral',
    parent: {
      type: 'sequence'
    }
  },
  {
    type: 'series',
    name: 'Vignette 1' ,
    parent: {
      type: 'sequence'
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
    type: 'pose',
    pose: 'transition1',
    name: 'half salutation',
    sides: 'unilateral',
    unilateralOnly: true,
    parent: {
      type: 'series',
      id: 0
    }
  },
  {
    type: 'pose',
    pose: 'transition2',
    name: 'turbo dog',
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
      type: 'sequence'
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
    sides: 'bilateral',
    duration: 5,
    timing: 'minutes',
    parent: {
      type: 'sequence'
    }
  },
]