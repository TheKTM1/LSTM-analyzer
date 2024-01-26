import { shallowMount } from '@vue/test-utils'
import LossDiagram from '@/components/LossDiagram.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('LossDiagram.vue', () => {

  it('receives props properly', () => {

    const propsToPass = {
      "rawChartData": {
        "entries": {
          "name": "test_1",
          "h_size": 100,
          "t_steps": 25,
          "input_text_size": 71,
          "input_text": "Pan Tadeusz ks. I",
          "iterations": [0,1000,2000,3000,4000,5000,6000,7000,8000],
          "loss": [192.82966227600798,84.67183948668401,44.51009525617914,29.48391942279636,23.858506024321603,21.613872566667037,20.71076704425145,20.352039507944504,20.084458039646293],
          "time_total": [0,12.023914900026284,23.409552400000393,34.56582040002104,45.74424190004356,56.90568840003107,68.05739620001987,79.2124926999677,90.37933979998343]
        }
      }
    }

    const wrapper = shallowMount(LossDiagram, {
      props: propsToPass
    })

    expect(wrapper.props().rawChartData.entries.name).toBe("test_1")
  });

  it('computes chart data', () => {

    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const expectedChart = {
      entries: {
        name: "test_1",
        h_size: 100,
        t_steps: 25,
        input_text_size: 71,
        input_text: "Pan Tadeusz ks. I",
        iterations: [0, 1000, 2000],
        loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
        time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
      },
    }

    expect(wrapper.vm.rawChartData).toEqual(expectedChart);

  });

  it('downloads the chart image', () => {
    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const downloadSpy = jest.spyOn(wrapper.vm, 'downloadAsImage');
    wrapper.find('button').trigger('click');

    expect(downloadSpy).toHaveBeenCalled();

  });
})

describe('TimeDiagram.vue', () => {

  it('receives props properly', () => {

    const propsToPass = {
      "rawChartData": {
        "entries": {
          "name": "test_1",
          "h_size": 100,
          "t_steps": 25,
          "input_text_size": 71,
          "input_text": "Pan Tadeusz ks. I",
          "iterations": [0,1000,2000,3000,4000,5000,6000,7000,8000],
          "loss": [192.82966227600798,84.67183948668401,44.51009525617914,29.48391942279636,23.858506024321603,21.613872566667037,20.71076704425145,20.352039507944504,20.084458039646293],
          "time_total": [0,12.023914900026284,23.409552400000393,34.56582040002104,45.74424190004356,56.90568840003107,68.05739620001987,79.2124926999677,90.37933979998343]
        }
      }
    }

    const wrapper = shallowMount(LossDiagram, {
      props: propsToPass
    })

    expect(wrapper.props().rawChartData.entries.name).toBe("test_1")
  });

  it('computes chart data', () => {

    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const expectedChart = {
      entries: {
        name: "test_1",
        h_size: 100,
        t_steps: 25,
        input_text_size: 71,
        input_text: "Pan Tadeusz ks. I",
        iterations: [0, 1000, 2000],
        loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
        time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
      },
    }

    expect(wrapper.vm.rawChartData).toEqual(expectedChart);

  });

  it('downloads the chart image', () => {
    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const downloadSpy = jest.spyOn(wrapper.vm, 'downloadAsImage');
    wrapper.find('button').trigger('click');

    expect(downloadSpy).toHaveBeenCalled();

  });
})

describe('RamDiagram.vue', () => {

  it('receives props properly', () => {

    const propsToPass = {
      "rawChartData": {
        "entries": {
          "name": "test_1",
          "h_size": 100,
          "t_steps": 25,
          "input_text_size": 71,
          "input_text": "Pan Tadeusz ks. I",
          "iterations": [0,1000,2000,3000,4000,5000,6000,7000,8000],
          "loss": [192.82966227600798,84.67183948668401,44.51009525617914,29.48391942279636,23.858506024321603,21.613872566667037,20.71076704425145,20.352039507944504,20.084458039646293],
          "time_total": [0,12.023914900026284,23.409552400000393,34.56582040002104,45.74424190004356,56.90568840003107,68.05739620001987,79.2124926999677,90.37933979998343]
        }
      }
    }

    const wrapper = shallowMount(LossDiagram, {
      props: propsToPass
    })

    expect(wrapper.props().rawChartData.entries.name).toBe("test_1")
  });

  it('computes chart data', () => {

    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const expectedChart = {
      entries: {
        name: "test_1",
        h_size: 100,
        t_steps: 25,
        input_text_size: 71,
        input_text: "Pan Tadeusz ks. I",
        iterations: [0, 1000, 2000],
        loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
        time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
      },
    }

    expect(wrapper.vm.rawChartData).toEqual(expectedChart);

  });

  it('downloads the chart image', () => {
    const wrapper = shallowMount(LossDiagram, {
      props: {
        rawChartData: {
          entries: {
            name: "test_1",
            h_size: 100,
            t_steps: 25,
            input_text_size: 71,
            input_text: "Pan Tadeusz ks. I",
            iterations: [0, 1000, 2000],
            loss: [192.82966227600798, 84.67183948668401, 44.51009525617914],
            time_total: [0, 12.023914900026284, 23.409552400000393, 34.56582040002104],
          },
        },
        chartTitle: 'Test',
      },
    })

    const downloadSpy = jest.spyOn(wrapper.vm, 'downloadAsImage');
    wrapper.find('button').trigger('click');

    expect(downloadSpy).toHaveBeenCalled();

  });
})