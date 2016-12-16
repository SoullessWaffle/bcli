import events from './events'

/**
 * {{ name }} actions
 */
export default {<%
{{ #each eventsList }}
  [events.<%= event %>]: ({ commit }, payload) => {
    commit(events.<%= [event] %>, payload)
  }{{ (i !== eventsList.length - 1) ? ',' : '' }}
{{ /each }}
{{ #if (eventsList.length === 0) }}
  // [events.GET_POST]: ({ commit }, payload) => {
  //   commit(events.GET_POST, payload)
  // }
{{ /if }}
}
