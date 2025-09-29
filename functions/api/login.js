// functions/api/login.js

export async function onRequestPost(context) {
    // In a real app, you would connect to a database like Cloudflare D1
    // and securely check hashed passwords. This is a simplified example.
    const { request, env } = context; 
    const { username, password } = await request.json();

    // Simplified mock for demonstration
     const MOCK_USERS_DB = [
        { id: 1, username: 'system_admin', password: 'password123', fullName: 'System Administrator', role: 'System Admin', subscription: { plan: 'Yearly', startDate: '2025-01-01', endDate: '2026-01-01' } },
        { id: 2, username: 'admin', password: 'password123', fullName: 'Admin User', role: 'Admin', subscription: { plan: 'Yearly', startDate: '2025-02-15', endDate: '2026-02-15' } },
        { id: 3, username: 'manager', password: 'password123', fullName: 'Manager User', role: 'Manager', subscription: { plan: 'Monthly', startDate: '2025-09-01', endDate: '2025-10-01' } },
        { id: 4, username: 'user', password: 'password123', fullName: 'Normal User', role: 'User', subscription: { plan: 'Monthly', startDate: '2025-09-15', endDate: '2025-10-15' } },
        { id: 5, username: 'expired_user', password: 'password123', fullName: 'Expired User', role: 'User', subscription: { plan: 'Monthly', startDate: '2025-08-01', endDate: '2025-09-01' } }
     ];
    const user = MOCK_USERS_DB.find(u => u.username === username && u.password === password);

    if (user) {
        // In a real app, you should not send the password back.
        const { password, ...userToSend } = user;
        return new Response(JSON.stringify(userToSend), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}