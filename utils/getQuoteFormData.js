
export const getQuoteFormData = [

    {
        id: 'firstName', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },
    {
        id: 'lastname', label: 'Last name', type: 'text', required: true, autoComplete: "family-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 1;
            }
            return false;
        },
        errorMessage: 'Last name should be at least 2 characters long'
    },

    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },

    {
        id: 'phone', label: 'Phone number', type: 'tel', required: false, autoComplete: "tel", validation: value => {
            const cleanPhone = (value || '').replace(/[^0-9]/g, '');
            return cleanPhone.length > 6; // Matches numbers having more than 6 characters
        },
        errorMessage: 'Please enter a valid New Zealand phone number'
    },

    {
        id: 'propertyType',
        label: 'Property type',
        type: 'select', // or 'radio' for single selection
        options: [
            { value: 'residential', label: 'Residential' },
            { value: 'commercial', label: 'Commercial' },
            { value: 'industrial', label: 'Industrial' },

        ],
        required: false,
        multiple: false
    },
    {
        id: 'service',
        label: 'Service required',
        type: 'chip', // or 'radio' for single selection
        multiple: true,
        priceType: "fixed",
        options: [
            { value: "commercial-cleaning", label: "Commercials Cleaning", price: 0 },
            { value: "house-cleaning", label: "House Cleaning", price: 0 },
            { value: "builder-clean", label: "Builder Clean", price: 0 },
            { value: "office-cleaning", label: "Office Cleaning", price: 0 },
            { value: "carpet-cleaning", label: "Carpet Cleaning", price: 0 },
            { value: "end-of-tenancy-cleaning", label: "End-of-Tenancy", price: 0 },
            { value: "exterior-washing-cleaning", label: "Exterior Washing", price: 0 },
            { value: "flood-restoration-cleaning", label: "Flood Restoration", price: 0 },
            { value: "grout-tiles-cleaning", label: "Grout & Tiles Cleaning", price: 90 },
            { value: "over-cleaning", label: "Oven Cleaning", price: 150 },
            { value: "show-glass-treatment", label: "Shower Glass Treatment", price: 280 },
            { value: "spring-cleaning", label: "Spring Cleaning", price: 750 },
            { value: "sweeping-scrubbing", label: "Sweeping & Scrubbing", price: 400 },
            { value: "upholstery-cleaning", label: "Upholstery Cleaning", price: 400 },
            { value: "vinyl-floor-striping", label: "Vinyl Floor Striping", price: 400 },
            { value: "window-cleaning", label: "Window Cleaning", price: 400 },
        ],
    },

    {
        id: 'message', label: 'Message', type: 'textarea', required: false,
    },



]