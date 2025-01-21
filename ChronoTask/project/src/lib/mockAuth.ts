interface MockUser {
  id: string;
  email: string;
  password: string;
}

const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin',
    password: 'admin'
  }
];

export const mockAuth = {
  signIn: (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      return { user: { id: user.id, email: user.email }, error: null };
    }
    return { user: null, error: 'Identifiants invalides' };
  }
};