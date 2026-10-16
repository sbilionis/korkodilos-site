// Round 11 proposals only: build with V=a or V=b to see the options. Normal builds (Netlify) have no V → nothing changes.
module.exports = { set: process.env.V || "" };
