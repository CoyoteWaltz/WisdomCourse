<template>
  <q-card  :color="cardColor" style="width: 290px">
    <q-card-title>
      {{title}}: {{semesterObj.name}}
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      <q-item>
        <q-item-side>
          <q-item-tile :color="iconColor" icon="event_available" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>选课时间:</q-item-tile>
          <q-item-tile text-color="grey-1" sublabel>
            {{semesterObj.selection_start}} ~ {{semesterObj.selection_end}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side>
          <q-item-tile :color="iconColor" icon="laptop" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>登分时间:</q-item-tile>
          <q-item-tile text-color="grey-1" sublabel>
            {{semesterObj.register_start}} ~ {{semesterObj.register_end}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-side>
          <q-item-tile :color="iconColor" icon="disc_full" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>学分上限: {{semesterObj.credit_ceiling}}</q-item-tile>
        </q-item-main>
      </q-item>
      <slot></slot>
    </q-card-main>
  </q-card>
</template>

<script>
// 封装一个展示学期的card
export default {
  name: 'SemesterCard',
  props: {
    semesterObj: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default () {
        return '当前学期'
      }
    },
    iconColor: {
      type: String,
      default () {
        return 'info'
      }
    },
    cardColor: {
      type: String,
      default () {
        return 'cyan-7'
      }
    }
  }
}
</script>

<style>

</style>
