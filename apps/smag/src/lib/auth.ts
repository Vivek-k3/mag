export const getGoogleUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    // redirect_uri: 'https://api.metaphy.ai/api/auth/google/callback',
    redirect_uri: 'http://localhost:9000/auth/google/callback',
    client_id: '1068495933323-rlkjir4cod6lt08f1c8uodaa6j2kcai1.apps.googleusercontent.com',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      // 'https://www.googleapis.com/auth/drive',
    ].join(' '),
    state: '/scpState=123',
  };
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};