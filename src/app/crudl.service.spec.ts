import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { CrudlService } from './crudl.service';

class Resource {
  id: number;
}

const resourcesUrl = "http://URL";
const resource: Resource = {
  id: 345
}
const resources: Resource[] = [
  resource,
  {
    id: 765
  }
];


@Injectable()
class TestService extends CrudlService<Resource> {
  constructor(http: HttpClient) {
    super(http, resourcesUrl);
  }
}

describe('CrudlService', () => {
  const resourceUrl: string = resourcesUrl + `${resource.id}/`;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe("when add is called", () => {
    let expected: Resource = resource;
    it("calls the resources api url",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
        }));
    it("uses POST method",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added resource",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          req.flush(expected);
        }));
    it("sends the resource to be created in body",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.body).toBe(resource);
          req.flush(expected);
        }));
  });

  describe("when getList is called", () => {
    it("calls the resources api url",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.getList().subscribe();
          const req = backend.expectOne(resourcesUrl);
        }));
    it("uses GET method",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.getList().subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.getList().subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resources",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.getList()
            .subscribe(response => expect(response)
              .toBe(resources));
          const req = backend.expectOne(resourcesUrl);
          req.flush(resources);
        }));
  });

  describe("when get is called", () => {
    it("calls the resources api url",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.get(resource.id).subscribe();
          const req = backend.expectOne(resourceUrl);
        }));
    it("uses GET method",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.get(resource.id).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.get(resource.id).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resource",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.get(resource.id)
            .subscribe(response => expect(response)
              .toBe(resource));
          const req = backend.expectOne(resourceUrl);
          req.flush(resource);
        }));
  });

  describe("when update is called", () => {
    it("calls the resources api url",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.update(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
        }));
    it("uses PUT method",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.update(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.method).toBe('PUT');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.update(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with updated resource",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.update(resource)
            .subscribe(response => expect(response)
              .toBe(resource));
          const req = backend.expectOne(
            resourcesUrl + `${resource.id}/`);
          req.flush(resource);
        }));
  });

  describe("when delete is called", () => {
    it("calls the resources api url",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
        }));
    it("uses DELETE method",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TestService, HttpTestingController],
        (service: TestService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });
});
