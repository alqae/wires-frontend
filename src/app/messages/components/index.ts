import { AllMessagesComponent } from './all-messages/all-messages.component';
import { CreateMessageComponent } from './create-message/create-message.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { MessagesComponent } from './messages.component';
import { MyMessagesComponent } from './my-messages/my-messages.component';

export const components = [
  MessagesComponent,
  CreateMessageComponent,
  AllMessagesComponent,
  MyMessagesComponent,
  MessageCardComponent,
];

export * from './messages.component';
export * from './create-message/create-message.component';
export * from './all-messages/all-messages.component';
export * from './my-messages/my-messages.component';
export * from './message-card/message-card.component';
