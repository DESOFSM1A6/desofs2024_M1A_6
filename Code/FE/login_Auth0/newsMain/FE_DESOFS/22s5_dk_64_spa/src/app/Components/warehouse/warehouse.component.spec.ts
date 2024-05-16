import { WarehouseComponent } from './warehouse.component';

describe('WarehouseComponent', () => {


  it('Test Convert North coordinates', () => {
    expect(WarehouseComponent.convertLatLong(10, 30, 'N')).toBe(10.5);
  });

  it('Test Convert South coordinates', () => {
    expect(WarehouseComponent.convertLatLong(10, 30, 'S')).toBe(-10.5);
  });

  it('Test Convert East coordinates', () => {
    expect(WarehouseComponent.convertLatLong(10, 30, 'E')).toBe(10.5);
  });

  it('Test Convert West coordinates', () => {
    expect(WarehouseComponent.convertLatLong(10, 30, 'O')).toBe(-10.5);
  });
});