# Signal Form Validation

This repo shows the current (21.0.0-next.0) validation definition and some alternatives. 

The alternatives are just dummy functions that don't actually do anything. The only goal is to show the ideas for different syntaxes and have them be comparable.


## Business Logic for the form

- Business Logic
- buildingNumber is required
- buildingNumber must have at least 2 characters
- buildingNumber is checked against database for existence
- roomNumber is required
- roomNumber must have at least 2 characters
- roomNumber is checked against database for existence in combination with the building
- Full Name is required
- E-Mail is required
- Category is required
- Phone is required if Urgency is high or critical
- Description is required
