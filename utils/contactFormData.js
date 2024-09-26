export const contactFormData = [

    {
        id: 'firstname', label: 'First name', type: 'text', required: true, autoComplete: "given-name", validation: value => {
            if (typeof value === 'string') {
                return value.trim().length > 2;
            }
            return false;
        },
        errorMessage: 'First name should be at least 3 characters long'
    },

    {
        id: 'email', label: 'Email address', type: 'email', required: true, autoComplete: "email", validation: value => /\S+@\S+\.\S+/.test(value),
        errorMessage: 'Enter a valid email address'
    },



    {
        id: 'services_needed',
        label: 'Type of service',
        type: 'select', // or 'radio' for single selection
        options: [
            { value: 'Website Optimization', label: 'Website Optimization' },
            { value: 'UX', label: 'UX' },
            { value: 'UI', label: 'UI' },
            { value: 'Web Development', label: 'Web Development' },
            { value: 'E-Commerce', label: 'E-Commerce' },
            { value: 'Cloud Services', label: 'Cloud Services' },
        ],
        required: false,
        multiple: true
    },
    {
        id: 'budget',
        label: 'Budget',
        type: 'select', // or 'radio' for single selection
        options: [
            { value: '$500 - $2,000', label: '$500 - $2,000' },
            { value: '$2,000 - $5,000', label: '$2,000 - $5,000' },
            { value: '$5000 - $20,000', label: '$5000 - $20,000' },
        ],
        required: false,
        multiple: false
    },
    {
        id: 'message', label: 'Message', type: 'textarea', required: false,
    },
    // 
]