import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { CrudfService } from './crudf.service';

class Resource {
  id: number;
}

const resourcesUrl: string = "http://URL";
const filterPrefix: string = "http://FURL/";
const filterSuffix: string = "SUFF/";
const resource: Resource = {
  id: 345
}
const resources: Resource[] = [
  resource,
  {
    id: 765
  }
];
const filterId: number = 128;

@Injectable()
class TestService extends CrudfService<Resource> {
  constructor(http: HttpClient) {
    super(http, resourcesUrl, filterPrefix, filterSuffix);
  }
}

describe('CrudfService', () => {
  const resourceUrl: string = resourcesUrl + `${resource.id}/`;
  const filterUrl: string = filterPrefix + `${filterId}/` + filterSuffix;

  let service: TestService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService]
    });
    service = TestBed.get(TestService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    let expected: Resource = resource;
    it("calls the resources api url, uses POST method, \
    sends request with application/json content type headers, \
    sends the resource to be created in body \
    and returns newly created resource",
      () => {
        service.add(resource).subscribe(
          response => expect(response).toBe(expected));
        const req = backend.expectOne(resourcesUrl);
        req.flush(expected);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(resource);
      });
  });

  describe("when getList is called", () => {
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested resources",
      () => {
        service.getList(filterId)
          .subscribe(response => expect(response)
            .toBe(resources));
        const req = backend.expectOne(filterUrl);
        req.flush(resources);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when get is called", () => {
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers \
    and requested resource",
      () => {
        service.get(resource.id).subscribe(
          response => expect(response).toBe(resource));
        const req = backend.expectOne(resourceUrl);
        req.flush(resource);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when update is called", () => {
    it("calls the resources api url, uses PUT method, \
    sends request with application/json content type headers \
    sends the resource to be updated in body \
    and returns updated resource",
      () => {
        service.update(resource)
          .subscribe(response => expect(response)
            .toBe(resource));
        const req = backend.expectOne(
          resourcesUrl + `${resource.id}/`);
        req.flush(resource);
        expect(req.request.body).toBe(resource);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when delete is called", () => {
    it("calls the resources api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(resource).subscribe();
        const req = backend.expectOne(resourceUrl);
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      });
  });
});
