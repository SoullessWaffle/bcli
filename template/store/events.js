/**
 * <%= name %> events
 */
export default {<%
eventsList.forEach(function(event, i){%>
  <%= event %>: '<%= name %>/<%= event %>'<%= i !== eventsList.length - 1 ? ',' : '' %><% }); %><%
if (eventsList.length === 0) { %>
  // GET_POST: '<%= name %>/GET_POST'<% } %>
}
