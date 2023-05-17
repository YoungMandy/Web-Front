var Trie = function () {
  this.childern = {};
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word)
{
  debugger
  let node = this.childern;

  const arr = [];

  for (const ch of word)
  {
    debugger
    if (!node[ch]) {
      node[ch] = {};
    }
    node = node[ch];
  }
  node.isEnd = true;
};
Trie.prototype.searchPrefix = function (prefix) {
  let node = this.childern;
  for (const ch of prefix) {
    if (!node[ch]) {
      return false;
    }
    node = node[ch];
  }
  return node;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);
  return node !== undefined && node.isEnd !== undefined;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  return this.searchPrefix(prefix);
};

/**
 * Your Trie object will be instantiated and called as such:
 * */

var obj = new Trie()


const list = [
  'trans',
  'transfer',
  'transform',
  'tran',
  'translator',
  'test',
  'abandon',
];

for (let value of list)
{
  obj.insert(value);
}

