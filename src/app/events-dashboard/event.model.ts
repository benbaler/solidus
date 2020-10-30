export enum EventStatus {
    NEW = 'NEW',
    CANCELLED = 'CANCELLED',
    PARTIALLY_FILLED = 'PARTIALLY FILLED'
}

export class SingleEvent {
    constructor(
      public timestamp: number,
      public price: number,
      public status: EventStatus,
      public snapshot: { BID: string[], ASK: string[] }) { }
}
