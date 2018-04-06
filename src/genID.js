// this function is modeled after the example in
// Short ID Generation in JavaScript 
// https://www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/

let shortID = {
  alphabet: '23456789abdegjkmnpqrvwxyz',
  id_len: 8,
  retries: 9999
};

let idList = [];

const generateID = () => {
  let id = '';
  let count = 0;

  const { alphabet, id_len} = shortID;
  const alphabet_len = shortID.alphabet.length;

  for (count; count < id_len; count++) {
    id += alphabet.charAt(Math.floor(Math.random() * alphabet_len));
  }
  return id;
}

export default function uniqueID(idList = []){
  let retry = 0;
  let newID = '';

  while(!newID && retry < shortID.retries){
     newID = generateID();
     if(idList.indexOf(newID) === -1){
        idList.push(newID);
        return newID;
     }
     newID = '';
     retry++;
  }
}
