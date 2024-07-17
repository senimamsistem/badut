export function convertToTOCKBaseUnits(amount) {
    const tockPerANLOG = 1e12; // 1 ANLOG = 1,000,000,000,000 TOCK base units
    return (parseFloat(amount) * tockPerANLOG).toFixed(0); // Convert and return as string
}

export function extractFieldsFromSQL(sql) {
    const regex = /SELECT (.*) FROM/;
    const matches = regex.exec(sql);
    if (matches && matches[1]) {
        const fields = matches[1].split(',').map(field => {
            const parts = field.trim().split(' AS ');
            return parts[0].trim().split('.')[1] || parts[0].trim().split('.')[0];
        });
        return fields.map(field => field.toLowerCase()); 
    }
    return [];
}
