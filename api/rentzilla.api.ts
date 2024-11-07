class ApiService {
    private adminAccessToken: string | null = null;
    private readonly apiUrl: string = `${process.env.BASE_URL}api`;

    private async createAdminAccessToken() {
        const url = `${this.apiUrl}/auth/jwt/create/`;
        const credentials = {
            email: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error(`Failed to create admin access token: ${response.statusText}`);
            }

            const data = await response.json();
            this.adminAccessToken = data.access;
        } catch (error) {
            console.error('Error creating admin access token:', error);
            throw error;
        }
    }

    private async authenticate() {
        if (!this.adminAccessToken) {
            await this.createAdminAccessToken();
        }
    }

    public async getListOfBackcalls() {
        await this.authenticate();
        const url = `${this.apiUrl}/backcall/`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch backcall list: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching backcall list:', error);
            throw error;
        }
    }

    public async deleteBackcall(id: number) {
        await this.authenticate();
        const url = `${this.apiUrl}/backcall/${id}/`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete backcall with id ${id}: ${response.statusText}`);
            }

            return { status: response.status, data: await response.json() };
        } catch (error) {
            console.error(`Error deleting backcall with id ${id}:`, error);
            throw error;
        }
    }

    public async createUnit(name: string, price: number) {
        await this.authenticate();
        const url = `${this.apiUrl}/units/`;
        const body = {
            name: `${name}`,
            first_name: "",
            last_name: "",
            model_name: "",
            description: "",
            features: "",
            views_count: 0,
            type_of_work: "HOUR",
            time_of_work: "",
            phone: "",
            minimal_price: `${price}`,
            money_value: "UAH",
            payment_method: "CASH_OR_CARD",
            lat: 50.453,
            lng: 30.516,
            count: 0,
            is_approved: true,
            is_archived: true,
            manufacturer: 340,
            owner: 1746,
            category: 308,
            services: [
                263
            ]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.adminAccessToken}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Failed to create unit: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating unit:', error);
            throw error;
        }
    }

    public async uploadUnitImage(unitId: number, filePath: string, isMain: boolean): Promise<any> {
        await this.authenticate();
        const url = `${this.apiUrl}/unit-images/`;
    
        // Read the image file as a Buffer (if filePath is local)
        const fs = require('fs');
        const path = require('path');
        const imagePath = path.resolve(filePath);
        const imageBuffer = fs.readFileSync(imagePath);
    
        // Convert Buffer to Blob (since FormData expects a Blob for file data)
        const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' }); 
    
        // Prepare the form data
        const formData = new FormData();
        formData.append('unit', unitId.toString());
        formData.append('image', imageBlob, path.basename(imagePath)); // Now using Blob here
        formData.append('is_main', isMain.toString());
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`Failed to upload image for unit ${unitId}: ${response.statusText}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    public async deleteUnit(unitId: number) {
        await this.authenticate();
        const url = `${this.apiUrl}/units/${unitId}/`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${this.adminAccessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete unit with id ${unitId}: ${response.statusText}`);
            }

            return response.status;
        } catch (error) {
            console.error(`Error deleting unit with id ${unitId}:`, error);
            throw error;
        }
    }
}

export default new ApiService();