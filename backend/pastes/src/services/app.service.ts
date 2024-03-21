import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDocs(): string {
    const welcomingMessage = 'Welcome to the Pastebin API! 📋';
    const availableEndpoints = [
      'GET all pastes: /get',
      'GET a single paste: /get/:id',
      'POST a new paste: /create',
      'DELETE a paste: /delete/:id',
      'PUT a paste: /update/:id',
    ];
    const exampleResponse = {
      title: 'Example Paste',
      content: 'This is an example paste.',
      password: '',
    };

    return JSON.stringify({
      message: welcomingMessage,
      endpoints: availableEndpoints,
      exampleResponse: exampleResponse,
    });
  }
}
