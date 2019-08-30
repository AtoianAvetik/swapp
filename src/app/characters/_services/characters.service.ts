import { Injectable } from '@angular/core';
import { ApiService } from '../../core/_services/api.service';

@Injectable()
export class CharactersService {
    constructor(private $apiService: ApiService) {

    }

}
