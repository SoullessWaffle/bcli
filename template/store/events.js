/**
 * {{ name }} events
 */
export default {
{{#each events}}
  {{value}}: '{{../name}}/{{value}}'{{#if isNotLastItem}},{{/if}}
{{/each}}
}
