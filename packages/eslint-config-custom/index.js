module.exports = {
	extends: [
		'next',
		'plugin:svelte/recommended',
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'@remix-run/eslint-config/jest-testing-library',
		'turbo',
		'prettier',
	],
	rules: {
		'@next/next/no-html-link-for-pages': 'off',
		'turbo/no-undeclared-env-vars': 'warn'
	},
	/* parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  }, */
	overrides: [
		{
				'files': ['*.svelte'],
				'parser': 'svelte-eslint-parser',
				"parserOptions": {
					"sourceType": "module",
					"ecmaVersion": 2021,
					"ecmaFeatures": {
							"globalReturn": false,
							"impliedStrict": false,
							"jsx": false
					}
			}
		}
]
};
