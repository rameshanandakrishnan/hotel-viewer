import React from 'react';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';

import Hotel from './Hotels';
import HotelCard from './components/HotelCard';
import HotelFilters from './components/HotelFilters';
import Room from './components/Room';
import { Button, Dialog } from '@material-ui/core';

export const delay = (ms = 0) => new Promise((res) => setTimeout(res, ms));

describe('Hotel Page', () => {
  beforeAll(() => {
    fetchMock
      .get(`https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`, [
        {
          id: 'OBMNG1',
          name: 'Hotel 1',
          images: [{ url: 'http://pic.com/linkToOBMNG1Img.png' }],
          town: 'London',
          country: 'UK',
          starRating: '5',
        },
        {
          id: 'OBMNG2',
          name: 'Hotel 2',
          images: [{ url: 'http://pic.com/linkToOBMNG2Img.png' }],
          town: 'London',
          country: 'UK',
          starRating: '2',
        },
      ])
      .get('https://obmng.dbm.guestline.net/api/roomRates/OBMNG/OBMNG1', {
        rooms: [
          {
            id: 'ROOM_ID1',
            occupancy: { maxAdults: 3, maxChildren: 2, maxOverall: 4 },
            images: [{ url: 'http://pic.com/ROOM_ID1.png' }],
            longDescription: 'Long description HOTEL1 Room1',
          },
          {
            id: 'ROOM_ID2',
            occupancy: { maxAdults: 4, maxChildren: 1, maxOverall: 4 },
            longDescription: 'Long description HOTEL1 Room2',
          },
        ],
      })
      .get('https://obmng.dbm.guestline.net/api/roomRates/OBMNG/OBMNG2', {
        rooms: [
          {
            id: 'ROOM_ID1',
            occupancy: { maxAdults: 3, maxChildren: 2, maxOverall: 4 },
            images: [{ url: 'http://pic.com/ROOM_ID1.png' }],
            longDescription: 'Long description HOTEL2 Room 1',
          },
          {
            id: 'ROOM_ID2',
            occupancy: { maxAdults: 8, maxChildren: 5, maxOverall: 10 },
            longDescription: 'Long description HOTEL2 Room 2',
          },
        ],
      });
  });

  it('should render Hotels', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();

    expect(component).toMatchSnapshot();
  });

  it('should filter hotels by star rating', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 5, adults: 0, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);

    component.find(HotelFilters).props().onFilterChange({ ratings: 2, adults: 0, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);

    component.find(HotelFilters).props().onFilterChange({ ratings: 3, adults: 0, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(0);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 0, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(2);
  });

  it('should filter hotels based on adults', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 2, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 8, children: 0 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);
    expect(component.find(HotelCard).at(0).text()).toContain('Hotel 2');
  });

  it('should filter hotels based on children', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 0, children: 1 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 0, children: 5 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);
    expect(component.find(HotelCard).at(0).text()).toContain('Hotel 2');
  });

  it('should filter hotels based on adults and children and should take into consideration the max capacity', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 1, children: 1 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 8, children: 5 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(0);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 5, children: 5 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);
  });

  it('should filter hotels based on occupancy and star ratings', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 0, adults: 1, children: 1 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(2);

    component.find(HotelFilters).props().onFilterChange({ ratings: 5, adults: 1, children: 1 });

    component.update();

    expect(component.find(HotelCard).length).toEqual(1);
    expect(component.find(HotelCard).at(0).text()).toContain('Hotel 1');
  });

  it('should render dialog with rooms when the user click on view rooms', async () => {
    const component = mount(<Hotel collectionId='OBMNG' />);

    await delay();
    component.update();

    expect(component.find(Dialog).props().open).toEqual(false);
    expect(component.find(Dialog).find(Room).length).toEqual(0);

    component.find(HotelCard).at(0).find(Button).simulate('click');

    component.update();

    expect(component.find(Dialog).props().open).toEqual(true);
    expect(component.find(Dialog).find(Room).length).toEqual(2);
    expect(component.find(Dialog).find(Room).at(0).text()).toContain('HOTEL1 Room1');
    expect(component.find(Dialog).find(Room).at(1).text()).toContain('HOTEL1 Room2');
  });
});
