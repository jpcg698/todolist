import listReducer, {
  add,
  remove,
} from './listSlice';

const date = new Date().toDateString() 

describe('list reducer', () => {
  const initialState = {
    items: [{text:"New task" , date:date}],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(listReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      status: 'idle',
    });
  });

  it('should handle adding to list', () => {
    const actual = listReducer(initialState, add({text:"another task", date:date}));
    expect(actual.items).toEqual([{text:"New task" , date:date},{text:"another task" , date:date}]);
  });

  it('should handle decrement', () => {
    const actual = listReducer(initialState, remove(2));
    expect(actual.items).toEqual([{text:"New task" , date:date}]);
  });

});
