export const sha256 = async (message: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const generateKeyPair = async (): Promise<CryptoKeyPair> => {
  return await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  );
};

export const exportPublicKey = async (key: CryptoKey): Promise<string> => {
  const exported = await crypto.subtle.exportKey('spki', key);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
};

export const signData = async (
  data: string,
  privateKey: CryptoKey
): Promise<string> => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const signature = await crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: { name: 'SHA-256' },
    },
    privateKey,
    encoded
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
};