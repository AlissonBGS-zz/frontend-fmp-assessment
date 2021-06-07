export interface Client {
    first_name: string;
    last_name: string;
    email: string;
    fakepass: string;
    faketoken: string;
    address: string;
    country: string;
    state: string;
    zipcode: string;
    payment_type: string;
    services: JSON;
    created_at: Date;
}
