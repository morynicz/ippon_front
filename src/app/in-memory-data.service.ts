import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      {
        "name": "P1",
        "surname": "S1",
        "sex": 0,
        "birthday": "2001-01-01T00:00:00.000Z",
        "rank": 2,
        "club_id": 0,
        "id": 0
      },
      {
        "name": "P2",
        "surname": "S2",
        "sex": 0,
        "birthday": "2002-02-02T00:00:00.000Z",
        "rank": 3,
        "club_id": 1,
        "id": 1
      },
      {
        "name": "P3",
        "surname": "S3",
        "sex": 0,
        "birthday": "2003-03-03T00:00:00.000Z",
        "rank": 4,
        "club_id": 3,
        "id": 3
      },
      {
        "name": "P4",
        "surname": "S4",
        "sex": 1,
        "birthday": "2004-04-04T00:00:00.000Z",
        "rank": 5,
        "club_id": 0,
        "id": 4
      },
      {
        "name": "P5",
        "surname": "S5",
        "sex": 1,
        "birthday": "2005-05-05T00:00:00.000Z",
        "rank": 6,
        "club_id": 1,
        "id": 5
      }
    ];

    const clubs = [
      {
        id: 1,
        name: "club 1",
        webpage: "www1",
        city: "city1",
        description: "desc1"
      },
      {
        id: 2,
        name: "club 2",
        webpage: "www2",
        city: "city2",
        description: "desc2"
      },
      {
        id: 3,
        name: "club 3",
        webpage: "www3",
        city: "city3",
        description: "desc3"
      }
    ]
    return { players, clubs };
  }
}
