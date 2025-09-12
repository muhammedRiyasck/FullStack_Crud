
export const isValid = ( email: string, password: string ,name?: string ) => {
    const newErrors = {name: '' , email: '', password: '' };
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    
    if (!email || password == null || password === '' || (name !== undefined && name === '')) {
        if (name !== undefined && name === '') {
            console.log('name is not givenn')
            newErrors.name = 'ⓧName is required';
        }
        if (!email) {
            newErrors.email = 'ⓧEmail is required';
        }
        if (password == null || password === '') {
            newErrors.password = 'ⓧPassword is required';
        }
        return newErrors;
    }

    if (name && name.length < 3) {
        newErrors.name = 'ⓧName must be at least 3 characters long';
        return newErrors;
    }

    if (!emailRegex.test(email)) {
        newErrors.email = 'ⓧInvalid email format';
        return newErrors;
    }

    if (!passwordRegex.test(password)) {
        newErrors.password = 'ⓧPassword must be at least 8 characters long and contain at least one letter and one number';
        return newErrors;
    }
    return {name: '', email: '', password: '' };

}
